package com.example.server.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select name from User where id= ?1")
    Optional<User> findUserById(Long id);

    @Query("select name from User where email= ?1")
    Optional<User> findUserByEmail(String email);

    @Query("UPDATE User SET isAdmin = ?2 WHERE id =  ?1")
    Optional<User> editAdmin(Long id,Boolean is_admin);

    @Query("UPDATE User SET email = ?2 WHERE id =  ?1")
    Optional<User> editEmail(Long id,String email);

    @Query("UPDATE User SET password = ?2 WHERE id =  ?1")
    Optional<User> editPassword(Long id,String password);

    @Query("UPDATE User SET name = ?2 WHERE id =  ?1")
    Optional<User> editName(Long id,String name);

//    @Query("delete  from User WHERE id =  ?1")
//    void deleteById(Long id);

    @Query("select password from User where email= ?1")
    String getPasswordByEmail(String email);
}
