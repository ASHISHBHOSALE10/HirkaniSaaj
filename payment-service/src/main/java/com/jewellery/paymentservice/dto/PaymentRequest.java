package com.jewellery.paymentservice.dto;

import java.math.BigDecimal;

public class PaymentRequest {
    private Long orderId;
    private Long userId;
    private BigDecimal amount;

    public PaymentRequest() {
    }

    public PaymentRequest(Long orderId, Long userId, BigDecimal amount) {
        this.orderId = orderId;
        this.userId = userId;
        this.amount = amount;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
