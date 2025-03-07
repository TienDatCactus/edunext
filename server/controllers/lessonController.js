const { getLessonsByStatus, getAllLessons } = require("../db/queries");


const getAllLesson = async (req, res) => {
    try {
        const result = await getAllLessons();
        if (!result.isOk) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error",
            isOk: false,
        });
    }
}




const sortLessonsByStatus = async (req, res) => {
    try {
        const { status } = req.query;
        if (!status) {
            return res.status(400).json({
                message: "Status parameter is required",
                isOk: false,
            });
        }

        const result = await getLessonsByStatus(status);
        if (!result.isOk) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error",
            isOk: false,
        });
    }
};

module.exports = {
    sortLessonsByStatus,
    getAllLesson
};
