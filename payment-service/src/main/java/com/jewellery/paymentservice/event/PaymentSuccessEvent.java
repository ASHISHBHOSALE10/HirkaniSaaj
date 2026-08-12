package com.jewellery.paymentservice.event;

import java.io.Serializable;

public class PaymentSuccessEvent implements Serializable {
    private Long orderId;
    private Long userId;
    private String transactionId;

    public PaymentSuccessEvent() {
    }

    public PaymentSuccessEvent(Long orderId, Long userId, String transactionId) {
        this.orderId = orderId;
        this.userId = userId;
        this.transactionId = transactionId;
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

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}
