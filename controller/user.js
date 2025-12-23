const User=require("../models/user.js")
module.exports.signup=async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new User({ email, username });
        const registereduser = await User.register(newuser, password);

        req.login(registereduser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.login=async (req, res) => {
        req.flash("success", "Welcome back!");

        const redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
};

module.exports.logout=async(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }else{
            req.flash("success","user logged out");
            res.redirect("/listings");
        }
    })
};

module.exports.renderloginform = async(req,res)=>{ 
    res.render("./users/login.ejs");
}