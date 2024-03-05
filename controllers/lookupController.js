const mongodb = require('../db/connect');

/* GET REQUESTS */
// get mailing label information
exports.getMailingLabelInfo = async (req, res) => {
  // #swagger.tags = ['Lookup']
  // #swagger.summary = 'Get pet name, owner name and mailing address'
  // #swagger.description = 'This will list all pets with their owners name and address information'
  const result = await mongodb
    .getDb()
    .db()
    .collection('pets')
    .aggregate([
      {
        $match: {
          petOwner: { $ne: '' } // Filter out empty pet Owner values
        }
      },
      {
        $lookup: {
          from: 'owners',
          let: { ownerId: { $toObjectId: '$petOwner' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$ownerId'] }
              }
            },
            {
              $project: {
                _id: 0,
                petName: 1,
                firstName: 1,
                lastName: 1,
                address: 1,
                city: 1,
                state: 1,
                zip: 1
              }
            }
          ],
          as: 'owners'
        }
      },
      {
        $project: {
          _id: 0,
          petName: 1,
          'owners.firstName': 1,
          'owners.lastName': 1,
          'owners.address': 1,
          'owners.city': 1,
          'owners.state': 1,
          'owners.zip': 1
        }
      }
    ]);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};
