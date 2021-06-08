import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Client } from "pg";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    const rows = await queryData();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify(rows)
    };
};

async function queryData() {
    const config = {
        host: process.env.RESOURCECONNECTOR_TESTNODEWEBAPPFUNCTIONSECRETCONNECTIONSUCCEEDED_HOST,
        user: process.env.RESOURCECONNECTOR_TESTNODEWEBAPPFUNCTIONSECRETCONNECTIONSUCCEEDED_USER,
        password: process.env.RESOURCECONNECTOR_TESTNODEWEBAPPFUNCTIONSECRETCONNECTIONSUCCEEDED_PASSWORD,
        database: process.env.RESOURCECONNECTOR_TESTNODEWEBAPPFUNCTIONSECRETCONNECTIONSUCCEEDED_DATABASE,
        port: parseInt(process.env.RESOURCECONNECTOR_TESTNODEWEBAPPFUNCTIONSECRETCONNECTIONSUCCEEDED_PORT, 10),
        ssl: JSON.parse(process.env.RESOURCECONNECTOR_TESTNODEWEBAPPFUNCTIONSECRETCONNECTIONSUCCEEDED_SSL)
    };

    try {
        const client = new Client(config);
        client.connect();
        const data = await client.query('SELECT NOW()');
        return data.rows;
    }
    catch (e) {
        throw e;
    }
    
    
}

export default httpTrigger;