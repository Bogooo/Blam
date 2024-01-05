package com.example.server.Review;
import com.example.server.User.User;
import com.example.server.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/review")
public class ReviewController {
    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @GetMapping
    public List<Review> GetReviews(){
        return this.reviewService.GetReviews();
    }

    @PostMapping
    public void addReview(@RequestBody Review review,@RequestBody User user){
        this.reviewService.addNewReview(review,user);
    }

    @DeleteMapping(path = "{reviewId}")
    public void deleteReview(@PathVariable("reviewId") Long reviewId){
        reviewService.deleteReview(reviewId);
    }
}
