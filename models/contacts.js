const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");


async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data)
}

async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find(el => el.id === id);
  return result || null

}

async function removeContact(id) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(el => el.id === id);
  if (idx === -1) {
    return null
  }
  const [result] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(el => el.id === id);
  if (idx === -1) {
    return null
  }
  contacts[idx] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx]
 }

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
