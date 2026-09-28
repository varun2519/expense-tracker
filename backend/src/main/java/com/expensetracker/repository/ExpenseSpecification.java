package com.expensetracker.repository;

import com.expensetracker.entity.Expense;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ExpenseSpecification {

    public static Specification<Expense> hasCategoryId(Long categoryId) {
        return (root, query, cb) -> categoryId == null ? null : cb.equal(root.get("category").get("id"), categoryId);
    }

    public static Specification<Expense> hasDateFrom(LocalDate from) {
        return (root, query, cb) -> from == null ? null : cb.greaterThanOrEqualTo(root.get("date"), from);
    }

    public static Specification<Expense> hasDateTo(LocalDate to) {
        return (root, query, cb) -> to == null ? null : cb.lessThanOrEqualTo(root.get("date"), to);
    }

    public static Specification<Expense> hasMinAmount(BigDecimal min) {
        return (root, query, cb) -> min == null ? null : cb.greaterThanOrEqualTo(root.get("amount"), min);
    }

    public static Specification<Expense> hasMaxAmount(BigDecimal max) {
        return (root, query, cb) -> max == null ? null : cb.lessThanOrEqualTo(root.get("amount"), max);
    }

    public static Specification<Expense> descriptionContains(String keyword) {
        return (root, query, cb) -> (keyword == null || keyword.trim().isEmpty())
                ? null
                : cb.like(cb.lower(root.get("description")), "%" + keyword.toLowerCase() + "%");
    }
}
