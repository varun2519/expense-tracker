package com.expensetracker.service;

import com.expensetracker.dto.ExpenseDTO;
import com.expensetracker.dto.PagedResponse;
import com.expensetracker.entity.Category;
import com.expensetracker.entity.Expense;
import com.expensetracker.exception.ResourceNotFoundException;
import com.expensetracker.repository.CategoryRepository;
import com.expensetracker.repository.ExpenseRepository;
import com.expensetracker.repository.ExpenseSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    
    @Transactional(readOnly = true)
    public PagedResponse<ExpenseDTO> getExpenses(Long categoryId, LocalDate from, LocalDate to,
                                                  BigDecimal minAmount, BigDecimal maxAmount,
                                                  String keyword, Pageable pageable) {
        Specification<Expense> spec = Specification
                .where(ExpenseSpecification.hasCategoryId(categoryId))
                .and(ExpenseSpecification.hasDateFrom(from))
                .and(ExpenseSpecification.hasDateTo(to))
                .and(ExpenseSpecification.hasMinAmount(minAmount))
                .and(ExpenseSpecification.hasMaxAmount(maxAmount))
                .and(ExpenseSpecification.descriptionContains(keyword));

        Page<Expense> page = expenseRepository.findAll(spec, pageable);
        return PagedResponse.of(page.map(this::toDTO));
    }
    
    @Transactional(readOnly = true)
    public ExpenseDTO getExpenseById(Long id) {
        return toDTO(findExpenseOrThrow(id));
    }

    @Transactional
    public ExpenseDTO createExpense(ExpenseDTO dto) {
        Category category = findCategoryOrThrow(dto.getCategoryId());
        Expense expense = Expense.builder()
                .description(dto.getDescription())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .category(category)
                .build();
        return toDTO(expenseRepository.save(expense));
    }

    @Transactional
    public ExpenseDTO updateExpense(Long id, ExpenseDTO dto) {
        Expense expense = findExpenseOrThrow(id);
        Category category = findCategoryOrThrow(dto.getCategoryId());
        expense.setDescription(dto.getDescription());
        expense.setAmount(dto.getAmount());
        expense.setDate(dto.getDate());
        expense.setCategory(category);
        return toDTO(expenseRepository.save(expense));
    }

    @Transactional
    public void deleteExpense(Long id) {
        expenseRepository.delete(findExpenseOrThrow(id));
    }

    private Expense findExpenseOrThrow(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
    }

    private Category findCategoryOrThrow(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
    }

    private ExpenseDTO toDTO(Expense expense) {
        return ExpenseDTO.builder()
                .id(expense.getId())
                .description(expense.getDescription())
                .amount(expense.getAmount())
                .date(expense.getDate())
                .categoryId(expense.getCategory().getId())
                .categoryName(expense.getCategory().getName())
                .build();
    }
}
