import create from './actions/create';
import read from './actions/read';
import update from './actions/update';
import del from './actions/del';

export default async function(req, res){
  try {
      const {location: locationData} = req.body;

      const action = await create(locationData);

      res.status(200);
      res.json({action});
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({error: "Unable to handle request"});
  } finally {
    await prisma.$disconnect();
  }
}