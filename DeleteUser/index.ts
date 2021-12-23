import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getUserId } from "../Common/Utils";
import { deleteUserItem } from "../DataAccess/user-item-repository";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log.info('Delete user started.');
    const id = context.bindingData.id;
    const userId = getUserId();

    try {
        await deleteUserItem(id, userId);
        context.res = {
            status: 204
        };
    } catch (error) {
        if (error.message.includes("User not found")) {
            context.res = {
                status: 404
            };
        } else {
            throw error;
        };
    }
    context.log.info('Delete user completed.');
    context.done()
};

export default httpTrigger;