package com.example.server.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    private static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(PASSWORD_REGEX);

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    public List<User> GetUsers() {
        return this.userRepository.findAll();
    }

    public void addNewUser(User user) throws InvalidException  {
        Optional<User> optionalUser = userRepository.findUserById(user.getId());
        if(optionalUser.isPresent()){
            throw new IllegalStateException("email taken");
        }
        if(isEmailValid(user.getEmail())==false) {
            throw new InvalidException("Email-ul introdus nu este valid.");
        }
        if(isPasswordValid(user.getPassword())==false) {
            throw new InvalidException("Parola introdusă nu este validă.");
        }
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        boolean exists = userRepository.existsById(userId);
        if(!exists){
            throw new IllegalStateException("user with "+userId+" does not exist");
        }
        userRepository.deleteById(userId);
    }


    public boolean isEmailValid(String email) {
        Matcher matcher = EMAIL_PATTERN.matcher(email);
        return matcher.matches();
    }

    public boolean isPasswordValid(String password) {
        Matcher matcher = PASSWORD_PATTERN.matcher(password);
        return matcher.matches();
    }
}

