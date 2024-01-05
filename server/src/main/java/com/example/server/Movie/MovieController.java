package com.example.server.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class MovieController {

    private final ApiService apiService;

    @Autowired
    public MovieController(ApiService apiService) {
        this.apiService = apiService;
    }

    @GetMapping("/movie/{movieName}")
    public void searchByName(@PathVariable String movieName) throws Exception {
         apiService.searchByName(movieName);
    }
}
