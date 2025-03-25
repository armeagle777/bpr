const getRequestIp = (req,res,next)=>{
    try {
        const serverHost = req.headers.host;
        res.status(200).json({host:serverHost});
    } catch (err) {
        console.log("Error crating User:", err);
        next(err);
    }
}

module.exports={getRequestIp}