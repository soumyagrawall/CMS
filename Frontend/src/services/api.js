const API_BASE = "/api/v1";

const getToken = () => localStorage.getItem("lumora_token");
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("lumora_user") || "null");
  } catch {
    return null;
  }
};

const setSession = (token, user) => {
  localStorage.setItem("lumora_token", token);
  localStorage.setItem("lumora_user", JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem("lumora_token");
  localStorage.removeItem("lumora_user");
};

const request = async (path, options = {}) => {
  const headers = new Headers(options.headers || {});
  const token = getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  // Handle self-healing stale/expired token scenarios:
  if (response.status === 401 && token) {
    clearSession();
    const cleanHeaders = new Headers(options.headers || {});
    if (options.body && !(options.body instanceof FormData)) {
      cleanHeaders.set("Content-Type", "application/json");
    }
    const retryResponse = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: cleanHeaders
    });
    const retryPayload = await retryResponse.json().catch(() => ({
      success: false,
      message: "Server returned invalid response",
    }));
    if (!retryResponse.ok || retryPayload.success === false) {
      throw new Error(retryPayload.message || "Request failed");
    }
    return retryPayload.data;
  }

  const payload = await response.json().catch(() => ({
    success: false,
    message: "Server returned invalid response",
  }));

  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || "Request failed");
  }

  return payload.data;
};

export const api = {
  getToken,
  getUser,
  setSession,
  clearSession,

  // Auth
  login: async (email, password) => {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setSession(data.token, data.user);
    return data.user;
  },

  signup: async (fullName, username, email, password) => {
    const data = await request("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ fullName, username, email, password }),
    });
    setSession(data.token, data.user);
    return data.user;
  },

  getMe: async () => {
    try {
      const data = await request("/auth/me");
      localStorage.setItem("lumora_user", JSON.stringify(data.user));
      return data.user;
    } catch (err) {
      clearSession();
      throw err;
    }
  },

  // Images & Feed
  getFeed: async () => {
    return request("/images/feed");
  },

  getImageDetail: async (id) => {
    return request(`/images/${id}`);
  },

  uploadImage: async (formData) => {
    return request("/images/upload", {
      method: "POST",
      body: formData,
    });
  },

  generateAIImage: async (payload) => {
    return request("/ai/images/generate", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  generateAICaption: async (payload) => {
    return request("/ai/captions/generate", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Social
  likeImage: async (imageId) => {
    return request(`/social/images/${imageId}/like`, { method: "POST" });
  },

  saveImage: async (imageId) => {
    return request(`/social/images/${imageId}/save`, { method: "POST" });
  },

  getComments: async (imageId) => {
    return request(`/social/images/${imageId}/comments`);
  },

  addComment: async (imageId, body) => {
    return request(`/social/images/${imageId}/comments`, {
      method: "POST",
      body: JSON.stringify({ body }),
    });
  },

  toggleFollowUser: async (userId) => {
    return request(`/social/users/${userId}/follow`, { method: "POST" });
  },

  // Search
  search: async (query) => {
    return request(`/search?q=${encodeURIComponent(query)}`);
  },

  searchTags: async (query) => {
    return request(`/search/tags?q=${encodeURIComponent(query)}`);
  },

  // Notifications
  getNotifications: async () => {
    return request("/notifications");
  },

  markNotificationAsRead: async (id) => {
    return request(`/notifications/${id}/read`, { method: "PATCH" });
  },

  markAllNotificationsAsRead: async () => {
    // We can iterate and mark all as read or if there's a bulk API.
    // The requirement is "mark all read button work".
    // We can call patch for each unread notification, or just do it in parallel!
    // That ensures all notifications are marked as read.
    const notifications = await request("/notifications");
    const unread = (notifications.notifications || []).filter(n => !n.readAt);
    await Promise.all(unread.map(n => request(`/notifications/${n.id}/read`, { method: "PATCH" })));
  },

  // Profile / Settings
  updateProfile: async (payload) => {
    return request("/users/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  getUserProfile: async (id) => {
    return request(`/users/${id}`);
  }
};
