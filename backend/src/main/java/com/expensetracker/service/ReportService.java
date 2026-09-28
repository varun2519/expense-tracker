package com.expensetracker.service;

import com.expensetracker.dto.MonthlySummaryDTO;
import com.expensetracker.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ExpenseRepository expenseRepository;

    public Map<String, Object> getMonthlySummary(int year, int month) {
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate start = yearMonth.atDay(1);
        LocalDate end = yearMonth.atEndOfMonth();

        List<MonthlySummaryDTO> byCategory = expenseRepository.findMonthlySummaryByCategory(start, end);
        BigDecimal total = expenseRepository.findTotalForPeriod(start, end);

        Map<String, Object> response = new HashMap<>();
        response.put("year", year);
        response.put("month", month);
        response.put("total", total);
        response.put("byCategory", byCategory);
        return response;
    }
}
