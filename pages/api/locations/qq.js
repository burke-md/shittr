import create from './actions/create';
import read from './actions/read';
import update from './actions/update';
import del from './actions/del';

export default async function(req, res){
  try {
      const reqData = req.body;
      const crudOpsRetrurn = [];
      
      console.log(Object.keys(reqData));

      if (reqData.create){
        const action = await create(reqData.create);
        action !== -1 ?
        crudOpsRetrurn.push(action):
        crudOpsRetrurn.push({"error": reqData})
      }
      if (reqData.read){
        const action = await read();
        action !== -1 ?
        crudOpsRetrurn.push(action):
        crudOpsRetrurn.push({"error": reqData})
      }
      if (reqData.update){
        const action = await update(reqData.update);
        action !== -1 ?
        crudOpsRetrurn.push(action):
        crudOpsRetrurn.push({"error": reqData})
      }
      if (reqData.del){
        const action = await del(reqData.del);
        action !== -1 ?
        crudOpsRetrurn.push(action):
        crudOpsRetrurn.push({"error": reqData})
      }


      res.status(200);
      res.json({crudOpsRetrurn});
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({error: "Unable to handle request"});
  }
}