const { response } = require("express");
const db = require("../db");


exports.getWishlist = async (request, response) => {

    try {
        const userId = request.user.id;


        const [wishlistItems] = await db.execute('SELECT * FROM wishlist WHERE user_id=? ORDER BY created_at DESC', [userId]);
        return response.status(200).json({
            whishlistItems: wishlistItems,
            message: "Wishlist retrieved successfully"
        });

    }catch(error){
        console.error('Get Whislist error', error);
        response.status(500).json({message: "Internal server error"});
    }
   
}