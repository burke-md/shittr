import create from './actions/create';
import read from './actions/read';
import update from './actions/update';
import del from './actions/del';

export default async function(req, res){
  try {
      const reqData = req.body;
      const crudOpsReturn = [];

      for (const opp in reqData){
        const result = await handdleCrud(opp, reqData[opp]);
        crudOpsReturn.push(result)
      }
      
      res.status(200);
      res.json({crudOpsReturn});
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({error: "Unable to handle request"});
  }
}


async function handdleCrud(opperation, data) {
  let action = null;

  if (opperation === "create"){
    action = await create(data);
  }
  if (opperation === "read"){
    action = await read();
  }
  if (opperation === "update"){
    action = await update(data);
  }
  if (opperation === "del"){
    action = await del(data);
  }

  if (action === -1){
    return {error: { [opperation]:{data}}}
  }
  return action;
}