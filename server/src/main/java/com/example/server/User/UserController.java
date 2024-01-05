package com.example.server.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/user")
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
    @PostMapping("/login")
    public boolean loginUser(@RequestBody User user){
        try {
            return this.userService.loginUserS(user);
        } catch (InvalidException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @PutMapping("/admin/modifyUser")
    public void modifyUserByAdmin(@RequestBody User admin,Boolean is_admin,Long id,String email,String name,String password){
        try {
            this.userService.modifyUserByAdminId(admin,is_admin,id,email,name, password);
        } catch (InvalidException e) {
            System.out.println(e.getMessage());
        }
    }
    @PutMapping("/modifyUser")
    public void modifyUser(@RequestBody User user,String email,String name,String password){
        try {
            this.userService.modifyUserId(user,email,name, password);
        } catch (InvalidException e) {
            System.out.println(e.getMessage());
        }
    }

    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        userService.deleteUser(userId);
    }
}
