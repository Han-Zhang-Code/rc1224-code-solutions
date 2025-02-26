select "customers"."firstName", "customers"."lastName"
from "customers" join "payments" using ("customerId")
order by "amount"
limit 10;
