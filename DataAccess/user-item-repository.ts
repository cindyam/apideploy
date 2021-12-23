import { CosmosClient } from "@azure/cosmos";
import { userItemRecord } from "../Models/user-item-record";

function getCosmosDbContainer() {
  const cosmosDbConnectionString = process.env["cindyan_DOCUMENTDB"];

  const client = new CosmosClient(cosmosDbConnectionString);
  const database = client.database("user");
  const container = database.container("userItems");

  return container;
}

export async function getAllUserItems(userId: string): Promise<userItemRecord[]> {
  const querySpec = {
    query: `SELECT * from c WHERE c.userId = '${userId}'`
  };

  const container = getCosmosDbContainer();
  const { resources: userItems } = await container.items
    .query(querySpec)
    .fetchAll();

  return userItems.map(item => {
    return {
      id: item.id,
      userId: item.userId,
      nama: item.nama,
      email: item.email,
      username: item.username,
      password: item.password,
      alamat: item.alamat,
      role: item.role
    } as userItemRecord;
  });
}

export async function deleteUserItem(id: string, userId: string): Promise<any> {
  const container = getCosmosDbContainer();
  const { resource: result } = await container.item(id, userId).delete();
  return result;
}

export async function createUserItem(userItem: userItemRecord) {
  const container = getCosmosDbContainer();
  const { resource: createdItem } = await container.items.create(userItem);
  return createdItem;
}