package com.example.server.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping
    public List<User> GetUsers(){
        return this.userService.GetUsers();
    }

    @PostMapping
    public void registerUser(@RequestBody User user){
        try {
            this.userService.addNewUser(user);
        } catch (InvalidException e) {
            System.out.println(e.getMessage());
        }
    }

    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        userService.deleteUser(userId);
    }
}
