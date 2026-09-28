package com.expensetracker.repository;

import com.expensetracker.dto.MonthlySummaryDTO;
import com.expensetracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long>, JpaSpecificationExecutor<Expense> {

    @Query("SELECT new com.expensetracker.dto.MonthlySummaryDTO(e.category.name, SUM(e.amount)) " +
           "FROM Expense e " +
           "WHERE e.date BETWEEN :start AND :end " +
           "GROUP BY e.category.name " +
           "ORDER BY SUM(e.amount) DESC")
    List<MonthlySummaryDTO> findMonthlySummaryByCategory(@Param("start") LocalDate start, @Param("end") LocalDate end);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.date BETWEEN :start AND :end")
    BigDecimal findTotalForPeriod(@Param("start") LocalDate start, @Param("end") LocalDate end);

    List<Expense> findByCategoryId(Long categoryId);
}
