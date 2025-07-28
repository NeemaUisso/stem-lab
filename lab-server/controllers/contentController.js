// controllers/contentController.js
import Practical from "../models/practical.js";

export const getpracticals = async (req, res) => { 
    try {
        const practicals = await Practical.find();
        res.status(200).json({ success: true, data: practicals });
    } catch (error) {
        
        console.error("Error fetching practicals:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getpracticalsDetails = async (req, res)=>{

     try {
    const practical = await Practical.findById(req.params.id);
    if (!practical) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    res.json({ success: true, data: practical });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}