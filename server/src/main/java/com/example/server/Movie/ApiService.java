package com.example.server.Movie;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.stereotype.Service;
import java.io.IOException;

@Service
public class ApiService {
    private static final String API_KEY = "81aa418e70msh5df0bcc0214f3cbp10632djsnd4c59f3e3cd8";
    private static final String HOST = "imdb8.p.rapidapi.com";

    public void searchByName(String movieName) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://imdb8.p.rapidapi.com/auto-complete?q=" + movieName))
                .header("X-RapidAPI-Key", API_KEY)
                .header("X-RapidAPI-Host", HOST)
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }

}
