package com.example.server.Movie;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
public class ApiService {
    private static final String API_KEY = "81aa418e70msh5df0bcc0214f3cbp10632djsnd4c59f3e3cd8";
    private static final String HOST = "imdb8.p.rapidapi.com";
    public ArrayList<Movie> searchByName(String movieName) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://imdb8.p.rapidapi.com/auto-complete?q=" + movieName))
                .header("X-RapidAPI-Key", API_KEY)
                .header("X-RapidAPI-Host", HOST)
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(response.body());

        ArrayList<Movie> movies = new ArrayList<>();
        for (JsonNode movieNode : rootNode.path("d")) {
            String id = movieNode.path("id").asText();
            String name = movieNode.path("l").asText();
            double rating = movieNode.path("rank").asDouble();
            String image = movieNode.path("i").path("imageUrl").asText();
            String description = movieNode.path("s").asText();
            String type = movieNode.path("qid").asText();

            Movie movie = new Movie(id, name, rating, image, description,type);
            movies.add(movie);
        }

        return movies;
    }

    public Movie searchById(String movieId) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://imdb8.p.rapidapi.com/title/auto-complete?q=" + movieId))
                .header("X-RapidAPI-Key", API_KEY)
                .header("X-RapidAPI-Host", HOST)
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(response.body());
        JsonNode firstMovieNode = rootNode.path("d").get(0);

        String id = firstMovieNode.path("id").asText();
        String name = firstMovieNode.path("l").asText();
        double rating = firstMovieNode.path("rank").asDouble();
        String image = firstMovieNode.path("i").path("imageUrl").asText();
        String description = firstMovieNode.path("s").asText();
        String type = firstMovieNode.path("qid").asText();

        Movie movie = new Movie(id, name, rating, image, description,type);
        return movie;

    }

    public Movie searchByIdDetails(String movieId) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://imdb8.p.rapidapi.com/title/get-overview-details?tconst="+movieId+"&currentCountry=US"))
                .header("X-RapidAPI-Key", "2f266c6eaemsheb6b73f2948a996p19caf1jsn5d668e759d34")
                .header("X-RapidAPI-Host", "imdb8.p.rapidapi.com")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(response.body());

        String id = rootNode.path("id").asText();
        String name = rootNode.path("l").asText();
        double rating = rootNode.path("rank").asDouble();
        String image = rootNode.path("i").path("imageUrl").asText();
        String category = rootNode.path("genre").asText();
        String type = rootNode.path("qid").asText();
        Integer year=rootNode.path("year").asInt();
        JsonNode genresNode = rootNode.path("genres");
        ArrayList<String> gen = new ArrayList<>();
        for (JsonNode genreNode : genresNode) {
            gen.add(genreNode.asText());
        }
        String plotLine = rootNode.path("plotOutline").path("text").asText();
        String description = rootNode.path("plotSummary").path("text").asText();
        String author=rootNode.path("author").path("text").asText();
        Movie movie = new Movie(id, name, rating, image, description, gen,type,year,plotLine,author);
        return movie;


    }
    public ArrayList<Movie> searchByCategory(String category) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://imdb8.p.rapidapi.com/title/v2/get-popular-movies-by-genre?genre="+category+"&limit=15"))
                .header("X-RapidAPI-Key", "81aa418e70msh5df0bcc0214f3cbp10632djsnd4c59f3e3cd8")
                .header("X-RapidAPI-Host", "imdb8.p.rapidapi.com")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        String responseBody = response.body();
        String[] movieIds = responseBody.split(",");
        movieIds[0] = movieIds[0].substring(9, movieIds[0].length() - 2);
        for (int i = 1; i < movieIds.length-1; i++) {
            movieIds[i] = movieIds[i].substring(8, movieIds[i].length() - 2);
        }
        movieIds[ movieIds.length-1] = movieIds[ movieIds.length-1].substring(8, movieIds[ movieIds.length-1].length() - 3);

        ArrayList<Movie> movies = new ArrayList<>();

        Iterator<String> iterator = Arrays.asList(movieIds).iterator();
        while (iterator.hasNext()) {
            movies.add(searchById(iterator.next()));
        }

        return movies;
    }

//    public String searchByIdDetails(String movieId) throws Exception {
//        HttpRequest request = HttpRequest.newBuilder()
//                .uri(URI.create("https://imdb8.p.rapidapi.com/title/get-overview-details?tconst="+movieId+"&currentCountry=US"))
//                .header("X-RapidAPI-Key", "2f266c6eaemsheb6b73f2948a996p19caf1jsn5d668e759d34")
//                .header("X-RapidAPI-Host", "imdb8.p.rapidapi.com")
//                .method("GET", HttpRequest.BodyPublishers.noBody())
//                .build();
//        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
//        String responseBody = response.body();
//
//        return responseBody;
//    }

}
