import Tour from "../models/Tour.js";

// ✅ Create Tour - with Cloudinary Image Upload
export const createTour = async (req, res) => {
  try {
    const { title, description, steps, isPublic } = req.body;

    // Validate input
    if (!title || !description || !steps) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Use req.file.path for Cloudinary image URL
    const imageUrl = req.file?.path || "";

    const newTour = new Tour({
      user: req.user._id,
      title,
      description,
      imageUrl,
      steps: typeof steps === "string" ? JSON.parse(steps) : steps, // safe parse
      isPublic,
    });

    await newTour.save();

    res.status(201).json({
      message: "Tour created successfully",
      tour: newTour,
    });
  } catch (error) {
    console.error("❌ Error creating tour:", error);
    res.status(500).json({
      message: "Failed to create tour",
      error: error.message,
      stack: error.stack,
    });
  }
};

// ✅ Get Logged-in User's Tours
export const getMyTours = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const tours = await Tour.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json(tours);
  } catch (error) {
    console.error("❌ Failed to fetch tours:", error);
    res.status(500).json({
      message: "Error fetching tours",
      error: error.message,
    });
  }
};

// ✅ Delete Tour
export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    if (tour.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await tour.deleteOne();
    res.status(200).json({ message: "Tour deleted" });
  } catch (error) {
    console.error("❌ Failed to delete tour:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
