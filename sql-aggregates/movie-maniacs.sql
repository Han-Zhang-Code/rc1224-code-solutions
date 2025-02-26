select "customers"."firstName", "customers"."lastName",sum("payments"."amount") as "Total Rental Amount"
from "customers" join "rentals" using ("customerId")
join "payments" using ("rentalId")
group by "customers"."customerId"
order by "Total Rental Amount" desc;
