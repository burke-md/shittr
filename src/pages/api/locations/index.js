import { 
    createLocationAction, 
    readLocationAction, 
    updateLocationAction, 
    deleteLocationAction 
} from '../../../backend/actions/locations';

export default async function endpointHandler(req, res) {
    try {
        const reqData = req.body;
        const result = await handleCrud(req.method, reqData);

        res.status(200).json({ result });
    } catch (err) {
        console.log(err);
        res.status(err.code || 500).json({ error: err.message });
    }
}


async function handleCrud(method, data) {
    const acceptableMethods = ['GET', 'POST', 'DELETE', 'PUT'];
    const methodFunctionsMap = {
        POST: () => createLocationAction(data),
        GET: () => readLocationAction(),
        PUT: () => updateLocationAction(data),
        DELETE: () => deleteLocationAction(),
    }

    if (!acceptableMethods.includes(method)) {
        const error = new Error('Wrong method provided.');
        error.code = 400;

        throw error;
    }
    
    return await methodFunctionsMap[method]();
}