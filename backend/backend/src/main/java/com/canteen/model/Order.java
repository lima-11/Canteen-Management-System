
package com.canteen.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;

    private String phone;

    private String pickupLocation;

    private double totalAmount;

    private String paymentMethod = "Cash";

    private String status = "Pending";

    private LocalDateTime orderDate = LocalDateTime.now();

    @OneToMany(
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @JoinColumn(name = "order_id")
    private List<OrderItem> items;
}
