import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getGuid, getUserId } from "../Common/Utils";
import { newUserItem } from "../Models/new-user-item";
import { UserItem } from "../Models/user-item";
import { userItemRecord } from "../Models/user-item-record";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log.info('Create user item started.');

    const newUser = req.body as newUserItem;

    if (newUser && newUser.email && newUser.nama && newUser.password && newUser.username && newUser.alamat && newUser.role) {
        const userItem = {
            id: getGuid(),
            nama: newUser.nama,
            email: newUser.email,
            username: newUser.username,
            password: newUser.password,
            alamat: newUser.alamat,
            role: newUser.role
        } as UserItem

        const userItemRecord = {
            userId: getUserId(),
            ...userItem
        } as userItemRecord

        context.bindings.userItemRecord = userItemRecord;

        context.res = {
            status: 201,
            body: userItem
        };
    } else {
        context.res = {
            status: 400
        };
        context.log.info('Create user item invalid input.', context.invocationId, JSON.stringify(newUser));
    }
    context.log.info('Create user item completed.');
    context.done()
};

export default httpTrigger;