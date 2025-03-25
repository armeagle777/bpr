const getRequestIp = (req,res,next)=>{
    try {
        const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
        res.status(200).json({ip});
    } catch (err) {
        console.log("Error crating User:", err);
        next(err);
    }
}

module.exports={getRequestIp}