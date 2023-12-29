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
        Optional<User> optionalUser1 = userRepository.findUserById(user.getId());
        Optional<User> optionalUser2 = userRepository.findUserByEmail(user.getEmail());
        if(optionalUser1.isPresent()){
            throw new IllegalStateException("already registered user");
        }

        if(isEmailValid(user.getEmail())==false) {
            throw new InvalidException("The email entered is not valid.");
        }
        if(optionalUser2.isPresent()){
            throw new IllegalStateException("email taken");
        }
        if(isPasswordValid(user.getPassword())==false) {
            throw new InvalidException("The password entered is not valid.");
        }
        userRepository.save(user);
    }

    public boolean loginUserS(User user) throws InvalidException  {
        Optional<User> optionalUser = userRepository.findUserByEmail(user.getEmail());
        if(isEmailValid(user.getEmail())==false) {
            throw new InvalidException("The email entered is not valid.");
        }
        if(optionalUser.isEmpty()){
            throw new IllegalStateException("user not found");
        }
        if(isPasswordValid(user.getPassword())==false) {
            throw new InvalidException("The password entered is not valid.");
        }
        String password=userRepository.getPasswordByEmail(user.getEmail());
        if(!password.equals(user.getPassword()))
        {
            throw new InvalidException("incorrect password");
        }
        return true;
    }

    public void modifyUserByAdminId( User admin,Boolean is_admin,Long id,String email,String name,String password) throws InvalidException
    {
        Optional<User> optionalAdmin = userRepository.findUserById(admin.getId());
        Optional<User> optionalUser = userRepository.findUserById(id);
        if(optionalAdmin.isEmpty()){
            throw new IllegalStateException("admin not found");
        }
        if(admin.getAdmin()==false)
        {
            throw new IllegalStateException("illegal action");
        }
        if(optionalUser.isEmpty()){
            throw new IllegalStateException("user not found");
        }
        if(isEmailValid(email)==false) {
            throw new InvalidException("The email entered is not valid.");
        }
        if(isPasswordValid(password)==false) {
            throw new InvalidException("The password entered is not valid.");
        }
        if(email.length()!=0)
        {
            userRepository.editEmail(id,email);
        }
        if(password.length()!=0)
        {
            userRepository.editPassword(id,password);
        }
        if(name.length()!=0)
        {
            userRepository.editName(id,name);
        }
        if(is_admin.equals(true))
        {
            userRepository.editAdmin(id,is_admin);
        }
    }
    public void modifyUserId(User user, String email, String name, String password)  throws InvalidException  {
        Optional<User> optionalUser = userRepository.findUserById(user.getId());
        Optional<User> optionalUser2 = userRepository.findUserByEmail(user.getEmail());
        if(optionalUser.isEmpty()){
            throw new IllegalStateException("user not found");
        }
        if(isPasswordValid(email)==false) {
            throw new InvalidException("The password entered is not valid.");
        }
        if(optionalUser2.isPresent()){
            throw new IllegalStateException("email taken");
        }
        if(isPasswordValid(password)==false) {
            throw new InvalidException("The password entered is not valid.");
        }
        if(email.length()!=0)
        {
            userRepository.editEmail(user.getId(),email);
        }
        if(password.length()!=0)
        {
            userRepository.editPassword(user.getId(),password);
        }
        if(name.length()!=0)
        {
            userRepository.editName(user.getId(),name);
        }
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

