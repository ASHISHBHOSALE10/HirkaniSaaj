package com.jewellery.orderservice.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    private String productName;

    private Integer quantity;

    private BigDecimal price;

    public OrderItem() {
    }

    public OrderItem(Long id, Long productId, String productName, Integer quantity, BigDecimal price) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public static OrderItemBuilder builder() {
        return new OrderItemBuilder();
    }

    public static class OrderItemBuilder {
        private Long productId;
        private String productName;
        private Integer quantity;
        private BigDecimal price;

        public OrderItemBuilder productId(Long productId) {
            this.productId = productId;
            return this;
        }

        public OrderItemBuilder productName(String productName) {
            this.productName = productName;
            return this;
        }

        public OrderItemBuilder quantity(Integer quantity) {
            this.quantity = quantity;
            return this;
        }

        public OrderItemBuilder price(BigDecimal price) {
            this.price = price;
            return this;
        }

        public OrderItem build() {
            OrderItem item = new OrderItem();
            item.setProductId(productId);
            item.setProductName(productName);
            item.setQuantity(quantity);
            item.setPrice(price);
            return item;
        }
    }
}
