package com.canteen.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "foods")
@Data
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String category;

    private double price;

    private String image;

    private boolean available = true;
}