package com.example.server.Movie;

public class Movie {
    private String id;
    private String name;
    private double rating;
    private String image;
    private String description;
    private String category;
    private String type;

    // constructor
    public Movie(String id, String name, double rating, String image, String description,String category,String type) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.image = image;
        this.description = description;
        this.category = category;
        this.type = type;

    }
    public Movie() {


    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
