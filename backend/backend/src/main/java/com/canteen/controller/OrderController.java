
package com.canteen.controller;

import com.canteen.model.Order;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // Get All Orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get Order By ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Place New Order
    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {

        if (order.getItems() == null || order.getItems().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        order.setStatus("Pending");

        Order savedOrder = orderRepository.save(order);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedOrder);
    }

    // Update Order Status
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Order updatedOrder) {

        return orderRepository.findById(id)
                .map(order -> {

                    order.setStatus(updatedOrder.getStatus());

                    Order savedOrder = orderRepository.save(order);

                    return ResponseEntity.ok(savedOrder);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete Order
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {

        if (!orderRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        orderRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}

// Order Repository
interface OrderRepository extends JpaRepository<Order, Long> {
}
