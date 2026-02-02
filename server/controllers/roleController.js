import Role from "../models/roleModel.js";

/* CREATE ROLE */
export const createRole = async (req, res) => {
  const role = await Role.create(req.body);
  res.status(201).json(role);
};

/* GET ALL ROLES */
export const getRoles = async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
};

/* GET ROLE BY ID */
export const getRoleById = async (req, res) => {
  const role = await Role.findById(req.params.id);
  res.json(role);
};

/* UPDATE ROLE */
export const updateRole = async (req, res) => {
  const role = await Role.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(role);
};

/* DELETE ROLE */
export const deleteRole = async (req, res) => {
  await Role.findByIdAndDelete(req.params.id);
  res.json({ message: "Role deleted" });
};
