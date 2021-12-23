import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getUserId } from "../Common/Utils";
import { getAllUserItems } from "../DataAccess/user-item-repository";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log.info('Get all user item started.');
    const userItem = await getAllUserItems(getUserId());
    if (userItem && userItem.length > 0) {
        context.res = {
            status: 200,
            body: userItem
        };
    } else {
        context.res = {
            status: 204
        };
    }
    context.log.info('Get all user item completed.');
    context.done()
};

export default httpTrigger;