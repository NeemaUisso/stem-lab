import Club from '../models/club.js'


export const getRegions = async (req, res) => {
  try {
    const getRegions = await Club.aggregate([
      {
        $group: {
          _id: "$region",
          count: { $sum: 1 },
          clubs: {
            $push: {
              _id: "$_id",
              schoolName: "$schoolName",
              clubInstructor: "$clubInstructor",
              email: "$email",
              contactNumber: "$contactNumber",
              region: "$region",
              numberOfTeams: "$numberOfTeams",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          region: "$_id",
          count: 1,
          clubs: 1,
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json(getRegions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
}; 
export const  getClubs = async (req, res)=>{
    try{
        const { region } = req.query;
        const filter = {};

        if(region){
            filter.region = { $regex : new regRex(`^${region}$`,'i')}
        }

        const clubs = await Club.find(filter).sort({ createdAt: -1}).lean();
        res.json(clubs);
    } catch(err){
        console.error(err);
        res.status(500).json({message:"internal server error"});
    }
};


export const getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id).lean();
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.json(club);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
