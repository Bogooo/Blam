package com.example.server.Review;
import com.example.server.User.User;
import com.example.server.User.UserRepository;
import com.example.server.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository){
        this.reviewRepository=reviewRepository;
    }

    public List<Review> GetReviews() {
        return this.reviewRepository.findAll();
    }

    public void addNewReview(Review review,User user)  {
        Optional<User> optionalUser = userRepository.findUserById(user.getId());
        if(optionalUser.isPresent()){
            throw new IllegalStateException("user doesn't exist");
        }
        reviewRepository.save(review);
    }

    public void deleteReview(Long reviewId) {
        boolean exists = userRepository.existsById(userId);
        if(!exists){
            throw new IllegalStateException("user with "+userId+" does not exist");
        }
        userRepository.deleteById(userId);
    }
}
