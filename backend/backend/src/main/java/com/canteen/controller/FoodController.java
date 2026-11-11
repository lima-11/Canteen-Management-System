
package com.canteen.controller;

import com.canteen.model.Food;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "http://localhost:5173")
public class FoodController {

    private final FoodRepository foodRepository;

    public FoodController(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    // Get All Foods
    @GetMapping
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    // Get Food By ID
    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable Long id) {
        return foodRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add New Food
    @PostMapping
    public ResponseEntity<Food> addFood(@RequestBody Food food) {
        Food savedFood = foodRepository.save(food);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedFood);
    }

    // Update Food
    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(
            @PathVariable Long id,
            @RequestBody Food updatedFood) {

        return foodRepository.findById(id)
                .map(food -> {
                    food.setName(updatedFood.getName());
                    food.setDescription(updatedFood.getDescription());
                    food.setCategory(updatedFood.getCategory());
                    food.setPrice(updatedFood.getPrice());
                    food.setImage(updatedFood.getImage());
                    food.setAvailable(updatedFood.isAvailable());

                    Food savedFood = foodRepository.save(food);

                    return ResponseEntity.ok(savedFood);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete Food
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {

        if (!foodRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        foodRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}

// Food Repository
@Repository
interface FoodRepository extends JpaRepository<Food, Long> {
}
