(function () {
  const API_BASE = window.LUMORA_API_BASE || `${window.location.origin}/api/v1`;
  const routes = {
    Feed: "/feed",
    Home: "/feed",
    Explore: "/explore",
    Search: "/explore",
    Create: "/create",
    Post: "/create",
    Notifications: "/notifications",
    Activity: "/notifications",
    Inbox: "/notifications",
    Profile: "/profile",
    You: "/profile",
    Settings: "/settings",
    Support: "/support"
  };
  const iconRoutes = {
    home: "/feed",
    explore: "/explore",
    search: "/explore",
    add_box: "/create",
    add_circle: "/create",
    notifications: "/notifications",
    account_circle: "/profile",
    person: "/profile",
    settings: "/settings",
    help: "/support"
  };

  const authPages = ["/", "/login", "/signup"];
  const tokenKey = "lumora_token";
  const userKey = "lumora_user";

  const getToken = () => localStorage.getItem(tokenKey);
  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem(userKey) || "null");
    } catch (error) {
      return null;
    }
  };

  const setSession = ({ token, user }) => {
    localStorage.setItem(tokenKey, token);
    localStorage.setItem(userKey, JSON.stringify(user));
  };

  const clearSession = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
  };

  const request = async (path, options = {}) => {
    const headers = new Headers(options.headers || {});
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    if (options.body && !(options.body instanceof FormData)) headers.set("Content-Type", "application/json");

    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers
    });

    const payload = await response.json().catch(() => ({
      success: false,
      message: "Unexpected server response"
    }));

    if (!response.ok || payload.success === false) {
      throw new Error(payload.message || "Request failed");
    }

    return payload;
  };

  const showMessage = (message, type = "info") => {
    let toast = document.querySelector("[data-lumora-toast]");
    if (!toast) {
      toast = document.createElement("div");
      toast.dataset.lumoraToast = "true";
      toast.style.cssText = [
        "position:fixed",
        "left:50%",
        "bottom:24px",
        "transform:translateX(-50%)",
        "z-index:9999",
        "max-width:min(520px,calc(100vw - 32px))",
        "padding:12px 16px",
        "border-radius:8px",
        "font:500 14px/1.4 'DM Sans',system-ui,sans-serif",
        "box-shadow:0 12px 40px rgba(0,0,0,.18)",
        "transition:opacity .2s ease"
      ].join(";");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.background = type === "error" ? "#BA1A1A" : "#30578F";
    toast.style.color = "#fff";
    toast.style.opacity = "1";
    window.clearTimeout(showMessage.timer);
    showMessage.timer = window.setTimeout(() => {
      toast.style.opacity = "0";
    }, 4200);
  };

  const setBusy = (button, busyText) => {
    if (!button) return () => {};
    const previous = button.textContent;
    button.disabled = true;
    button.style.opacity = ".75";
    button.textContent = busyText;
    return () => {
      button.disabled = false;
      button.style.opacity = "";
      button.textContent = previous;
    };
  };

  const inputByIdOrPlaceholder = (id, placeholderPart) => {
    const byId = document.getElementById(id);
    if (byId) return byId;
    return Array.from(document.querySelectorAll("input, textarea")).find((element) =>
      (element.placeholder || "").toLowerCase().includes(placeholderPart.toLowerCase())
    );
  };

  const normalizeUsername = (username) => username.trim().replace(/^@/, "");
  const parseTags = (value) =>
    value
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter(Boolean);

  const currentPath = () => window.location.pathname.replace(/\/$/, "") || "/";

  const guardAuth = () => {
    if (!authPages.includes(currentPath()) && !getToken()) {
      window.location.href = "/login";
    }
  };

  const wireNavigation = () => {
    document.querySelectorAll("a").forEach((anchor) => {
      const label = anchor.textContent.trim();
      const icon = anchor.querySelector(".material-symbols-outlined")?.textContent?.trim();
      const target = routes[label] || iconRoutes[icon];
      if (target) anchor.href = target;
    });

    document.querySelectorAll("button").forEach((button) => {
      const label = button.textContent.trim();
      const icon = button.querySelector(".material-symbols-outlined")?.textContent?.trim();
      const target = routes[label] || iconRoutes[icon];
      if (target) {
        button.addEventListener("click", () => {
          window.location.href = target;
        });
      }
    });

    document.querySelectorAll("a").forEach((anchor) => {
      if (anchor.textContent.trim().toLowerCase() === "sign up") anchor.href = "/signup";
      if (anchor.textContent.trim().toLowerCase() === "log in") anchor.href = "/login";
    });
  };

  const wireLogin = () => {
    const form = document.querySelector("form");
    const email = inputByIdOrPlaceholder("email", "example.com");
    const password = inputByIdOrPlaceholder("password", "password");
    if (!form || !email || !password || currentPath() !== "/login" && currentPath() !== "/") return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submit = form.querySelector("[type='submit']");
      const done = setBusy(submit, "Signing in...");
      try {
        const response = await request("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email: email.value.trim(), password: password.value })
        });
        setSession(response.data);
        showMessage("Welcome back to Lumora.");
        window.location.href = "/feed";
      } catch (error) {
        showMessage(`${error.message}. Check MySQL setup if the database is not ready yet.`, "error");
      } finally {
        done();
      }
    });
  };

  const wireSignup = () => {
    if (currentPath() !== "/signup") return;
    const form = document.querySelector("form");
    const fullName = inputByIdOrPlaceholder("name", "Evelyn");
    const username = inputByIdOrPlaceholder("username", "@");
    const email = inputByIdOrPlaceholder("email", "studio.com");
    const password = inputByIdOrPlaceholder("password", "password");
    if (!form || !fullName || !username || !email || !password) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submit = form.querySelector("[type='submit']");
      const done = setBusy(submit, "Creating...");
      try {
        const response = await request("/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            fullName: fullName.value.trim(),
            username: normalizeUsername(username.value),
            email: email.value.trim(),
            password: password.value
          })
        });
        setSession(response.data);
        showMessage("Account created.");
        window.location.href = "/feed";
      } catch (error) {
        showMessage(`${error.message}. Check MySQL setup if the database is not ready yet.`, "error");
      } finally {
        done();
      }
    });
  };

  const wireCreate = () => {
    if (currentPath() !== "/create") return;
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.hidden = true;
    document.body.appendChild(fileInput);

    const chooseButton = Array.from(document.querySelectorAll("button")).find((button) =>
      button.textContent.toLowerCase().includes("browse")
    );
    if (chooseButton) chooseButton.addEventListener("click", () => fileInput.click());

    const title = inputByIdOrPlaceholder("title", "Give your creation");
    const caption = inputByIdOrPlaceholder("caption", "short story");
    const tags = inputByIdOrPlaceholder("tags", "Add tags");
    const prompt = inputByIdOrPlaceholder("prompt", "Describe the scene");

    const aiCaptionButton = Array.from(document.querySelectorAll("button")).find((button) =>
      button.textContent.toLowerCase().includes("ai caption")
    );
    if (aiCaptionButton) {
      aiCaptionButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const done = setBusy(aiCaptionButton, "Writing...");
        try {
          const response = await request("/ai/captions/generate", {
            method: "POST",
            body: JSON.stringify({
              prompt: prompt?.value || title?.value || "editorial image",
              title: title?.value || "",
              tags: parseTags(tags?.value || "")
            })
          });
          if (caption) caption.value = response.data.caption;
          showMessage("Caption generated.");
        } catch (error) {
          showMessage(error.message, "error");
        } finally {
          done();
        }
      });
    }

    const publishButton = Array.from(document.querySelectorAll("button")).find((button) =>
      button.textContent.toLowerCase().includes("publish")
    );
    if (publishButton) {
      publishButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const done = setBusy(publishButton, "Publishing...");
        try {
          let response;
          if (fileInput.files[0]) {
            const formData = new FormData();
            formData.set("image", fileInput.files[0]);
            formData.set("title", title?.value || "Untitled");
            formData.set("caption", caption?.value || "");
            formData.set("tags", parseTags(tags?.value || "").join(","));
            response = await request("/images/upload", { method: "POST", body: formData });
          } else {
            response = await request("/ai/images/generate", {
              method: "POST",
              body: JSON.stringify({
                prompt: prompt?.value || "Editorial image",
                style: "editorial",
                title: title?.value || "Untitled AI Creation",
                caption: caption?.value || "",
                tags: parseTags(tags?.value || "")
              })
            });
          }
          const imageId = response.data.image?.id;
          showMessage("Post published.");
          if (imageId) window.location.href = `/post?id=${imageId}`;
        } catch (error) {
          showMessage(error.message, "error");
        } finally {
          done();
        }
      });
    }
  };

  const wireSearch = () => {
    const inputs = Array.from(document.querySelectorAll("input")).filter((input) =>
      (input.placeholder || "").toLowerCase().includes("search")
    );
    inputs.forEach((input) => {
      input.addEventListener("keydown", async (event) => {
        if (event.key !== "Enter" || !input.value.trim()) return;
        event.preventDefault();
        try {
          const response = await request(`/search?q=${encodeURIComponent(input.value.trim())}`);
          const count =
            (response.data.images?.length || 0) + (response.data.users?.length || 0) + (response.data.tags?.length || 0);
          showMessage(`${count} results found for "${input.value.trim()}".`);
        } catch (error) {
          showMessage(error.message, "error");
        }
      });
    });
  };

  const wirePostDetail = () => {
    if (currentPath() !== "/post") return;
    const params = new URLSearchParams(window.location.search);
    const imageId = params.get("id") || "1";

    const commentInput = Array.from(document.querySelectorAll("input")).find((input) =>
      (input.placeholder || "").toLowerCase().includes("thoughts")
    );

    document.querySelectorAll("button").forEach((button) => {
      const label = button.textContent.toLowerCase();
      if (label.includes("like post")) {
        button.addEventListener("click", async () => {
          try {
            const response = await request(`/social/images/${imageId}/like`, { method: "POST" });
            showMessage(response.message);
          } catch (error) {
            showMessage(error.message, "error");
          }
        });
      }
      if (label.trim() === "save") {
        button.addEventListener("click", async () => {
          try {
            const response = await request(`/social/images/${imageId}/save`, { method: "POST" });
            showMessage(response.message);
          } catch (error) {
            showMessage(error.message, "error");
          }
        });
      }
      if (label.trim() === "post" && commentInput) {
        button.addEventListener("click", async () => {
          try {
            await request(`/social/images/${imageId}/comments`, {
              method: "POST",
              body: JSON.stringify({ body: commentInput.value })
            });
            commentInput.value = "";
            showMessage("Comment posted.");
          } catch (error) {
            showMessage(error.message, "error");
          }
        });
      }
    });
  };

  const wireFeed = async () => {
    if (currentPath() !== "/feed") return;
    const grid = document.querySelector(".masonry-grid");
    if (!grid) return;

    try {
      const response = await request("/images/feed");
      const images = response.data.images || [];
      
      grid.innerHTML = "";
      
      if (images.length === 0) {
        grid.innerHTML = "<p class='col-span-full text-center text-on-surface-variant p-8'>No posts found.</p>";
        return;
      }

      images.forEach((image) => {
        const aspect = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[16/9]", "aspect-[9/16]"][Math.floor(Math.random() * 5)];
        const card = document.createElement("div");
        card.className = "masonry-item subtle-lift bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant group relative";
        
        card.innerHTML = `
<div class="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="w-8 h-8 rounded-full bg-surface-container-lowest/90 text-on-surface shadow-sm flex items-center justify-center hover:bg-white transition-colors" data-save="${image.id}">
<span class="material-symbols-outlined text-[20px]" data-icon="bookmark">bookmark</span>
</button>
</div>
<a class="block overflow-hidden ${aspect} bg-surface-container-high" href="/post?id=${image.id}">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="${image.title || 'Post image'}" src="${image.imageUrl || ''}">
</a>
<div class="flex items-center justify-between px-4 py-3">
<div class="flex gap-4">
<button class="text-on-surface-variant hover:text-error transition-colors flex items-center" data-like="${image.id}">
<span class="material-symbols-outlined" data-icon="favorite">favorite</span>
<span class="text-xs ml-1 font-label-sm">${image.likeCount || 0}</span>
</button>
<button class="text-on-surface-variant hover:text-primary transition-colors flex items-center" data-comment="${image.id}">
<span class="material-symbols-outlined" data-icon="chat_bubble">chat_bubble</span>
<span class="text-xs ml-1 font-label-sm">${image.commentCount || 0}</span>
</button>
</div>
<span class="text-label-sm font-label-sm text-on-surface-variant">@${image.User?.username || "creator"}</span>
</div>
        `;
        grid.appendChild(card);
      });

      grid.querySelectorAll("[data-like]").forEach(btn => {
        btn.addEventListener("click", async (e) => {
          e.preventDefault();
          try {
            const res = await request(`/social/images/${btn.dataset.like}/like`, { method: "POST" });
            showMessage(res.message);
          } catch(err) { showMessage(err.message, "error"); }
        });
      });
      grid.querySelectorAll("[data-save]").forEach(btn => {
        btn.addEventListener("click", async (e) => {
          e.preventDefault();
          try {
            const res = await request(`/social/images/${btn.dataset.save}/save`, { method: "POST" });
            showMessage(res.message);
          } catch(err) { showMessage(err.message, "error"); }
        });
      });
      grid.querySelectorAll("[data-comment]").forEach(btn => {
        btn.addEventListener("click", () => window.location.href = `/post?id=${btn.dataset.comment}`);
      });
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const hydrateUserBits = () => {
    const user = getUser();
    if (!user) return;
    document.querySelectorAll("[data-lumora-user]").forEach((element) => {
      element.textContent = user.fullName || user.username;
    });
  };

  const boot = () => {
    wireNavigation();
    guardAuth();
    wireLogin();
    wireSignup();
    wireCreate();
    wireSearch();
    wirePostDetail();
    wireFeed();
    hydrateUserBits();
    window.LumoraAPI = { request, getToken, getUser, clearSession };
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
