const { pool } = require("../config/database");

const publicFields = `
  id, full_name AS fullName, username, email, avatar_url AS avatarUrl,
  bio, website, location, is_private AS isPrivate, created_at AS createdAt
`;

const findByEmail = async (email) => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE email = :email LIMIT 1", { email });
  return rows[0] || null;
};

const findByUsername = async (username) => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE username = :username LIMIT 1", { username });
  return rows[0] || null;
};

const findById = async (id) => {
  const [rows] = await pool.execute(`SELECT ${publicFields} FROM users WHERE id = :id LIMIT 1`, { id });
  return rows[0] || null;
};

const create = async ({ fullName, username, email, passwordHash }) => {
  const [result] = await pool.execute(
    `INSERT INTO users (full_name, username, email, password_hash)
     VALUES (:fullName, :username, :email, :passwordHash)`,
    { fullName, username, email, passwordHash }
  );
  return findById(result.insertId);
};

const update = async (id, payload) => {
  const values = {
    fullName: payload.fullName ?? null,
    bio: payload.bio ?? null,
    website: payload.website ?? null,
    location: payload.location ?? null,
    avatarUrl: payload.avatarUrl ?? null,
    isPrivate: payload.isPrivate ?? null
  };

  await pool.execute(
    `UPDATE users
     SET full_name = COALESCE(:fullName, full_name),
         bio = COALESCE(:bio, bio),
         website = COALESCE(:website, website),
         location = COALESCE(:location, location),
         avatar_url = COALESCE(:avatarUrl, avatar_url),
         is_private = COALESCE(:isPrivate, is_private)
     WHERE id = :id`,
    { id, ...values }
  );
  return findById(id);
};

const search = async (term, limit, offset) => {
  const like = `%${term}%`;
  const [rows] = await pool.execute(
    `SELECT ${publicFields}
     FROM users
     WHERE username LIKE :like OR full_name LIKE :like
     ORDER BY created_at DESC
     LIMIT :limit OFFSET :offset`,
    { like, limit, offset }
  );
  return rows;
};

module.exports = {
  findByEmail,
  findByUsername,
  findById,
  create,
  update,
  search
};
