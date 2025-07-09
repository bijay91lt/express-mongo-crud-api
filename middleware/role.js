const requireAdmin = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(401).json({error: 'Access denied'});
    }
    next();
}

module.exports = requireAdmin;