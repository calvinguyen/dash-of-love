import {db} from "../database.js"

// Get all orders
export async function getOrders() {
    const sql = "select * from `Order`";
    const [results] = await db.query(sql);
  
    return results
}

// Get a order by id
export async function getOrderById(id) {
    const sql = `
      select *
      from \`Order\`
      where orderID = ?
    `;
    const [rows] = await db.query(sql, [id]);

    rows[0].order_date = rows[0].order_date.toLocaleDateString('fr-CA');
    rows[0].desired_date = rows[0].desired_date.toLocaleDateString('fr-CA');

    return rows[0];
}

// Get a order by id
export async function getFullOrderById(id) {
    const sql = `
    select \`Order\`.orderID, \`Order\`.order_date, \`Order\`.customerID,
    \`Order\`.cakesID, Cake_Type.typeID, Cake_Type.type, Cake_Flavor.flavorID, Cake_Flavor.flavor,
    \`Order\`.referralID, \`Order\`.cake_details, \`Order\`.final_price,
    \`Order\`.statusID, \`Order\`.desired_date, \`Order\`.pick_up_details,
    \`Order\`.image, \`Order\`.paymentID
    from \`Order\`
    Inner join Order_Status
        On \`Order\`.statusID = Order_Status.statusID
    Inner join Product_Menu
        On \`Order\`.cakesID = Product_Menu.cakesID
    Inner join Cake_Type
        On Product_Menu.typeID = Cake_Type.typeID
    Inner join Cake_Flavor
        On Product_Menu.flavorID = Cake_Flavor.flavorID
    where \`Order\`.orderID = ?
    `;
    const [rows] = await db.query(sql, [id]);

    rows[0].order_date = rows[0].order_date.toLocaleDateString('fr-CA');
    rows[0].desired_date = rows[0].desired_date.toLocaleDateString('fr-CA');

    return rows[0];
}

// Create a order
export async function createOrder(customerID, cakesID, referralID, details, desiredDate, image) {
    const sql = `
      insert into \`Order\` (customerID, cakesID, referralID, cake_details, desired_date, image)
      values (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [customerID, cakesID, referralID, details, desiredDate, image]);
    const id = result.insertId;
  
    return getOrderById(id);
}

// Update an order by id
export async function updateOrderById(orderID, cakesId, referralId, cake_details, status, desired_date, pickup, price, paymentID) {
    const sql = `
      update \`Order\`
      set cakesID = ?,
      referralID = ?,
      cake_details = ?,
      statusID = ?,
      desired_date = ?,
      pick_up_details = ?,
      final_price = ?,
      paymentID = ?
      where orderID = ?
    `;
    const [result] = await db.query(sql, [cakesId, referralId, cake_details, status, desired_date, pickup, price, paymentID, orderID]);
    
    return getOrderById(orderID);
}

// Update an order's status by id
export async function updateOrderStatusById(orderID, status) {
    const sql = `
      update \`Order\`
      set statusID = ?
      where orderID = ?
    `;
    const [result] = await db.query(sql, [status, orderID]);
    
    return getOrderById(orderID);
}

// Get Order View for Admin Order Table
export async function getAdminOrderView() {
    const sql = `
        select \`Order\`.orderID, \`Order\`.order_date, \`Order\`.customerID,
        Customer.first_name, Customer.last_name, Customer.email, Customer.phone,
        Cake_Type.type, Cake_Flavor.flavor, \`Order\`.final_price,
        \`Order\`.cake_details, \`Order\`.statusID, Order_Status.description,
        \`Order\`.desired_date, \`Order\`.pick_up_details
        from \`Order\`
        Inner join Order_Status
        On \`Order\`.statusID = Order_Status.statusID
        Inner join Customer
        On \`Order\`.customerID = Customer.customerID
        Inner join Product_Menu
        On \`Order\`.cakesID = Product_Menu.cakesID
        Inner join Cake_Type
        On Product_Menu.typeID = Cake_Type.typeID
        Inner join Cake_Flavor
        On Product_Menu.flavorID = Cake_Flavor.flavorID
    `;
    const [results] = await db.query(sql);
    
    results.forEach((item) => {
        item.order_date = item.order_date.toLocaleDateString('fr-CA');
        item.desired_date = item.desired_date.toLocaleDateString('fr-CA');
    });

    return results
}

// Get Order Status Descriptions from status table
export async function getOrderStatusDescriptions() {
    const sql = "select * from Order_Status order by statusID";
    const [results] = await db.query(sql);
  
    return results
}

// Get a Customer's order history
export async function getCustomerOrders(customerID) {
    const sql = `
    select \`Order\`.orderID, \`Order\`.order_date, \`Order\`.customerID,
    Cake_Type.type, Cake_Flavor.flavor, \`Order\`.final_price,
    \`Order\`.cake_details, \`Order\`.statusID, Order_Status.description, \`Order\`.desired_date, \`Order\`.pick_up_details
    from \`Order\`
    Inner join Order_Status
    	On \`Order\`.statusID = Order_Status.statusID
    Inner join Product_Menu
    	On \`Order\`.cakesID = Product_Menu.cakesID
    Inner join Cake_Type
    	On Product_Menu.typeID = Cake_Type.typeID
    Inner join Cake_Flavor
    	On Product_Menu.flavorID = Cake_Flavor.flavorID
    where \`Order\`.customerID = ?;
    `;
    const [results] = await db.query(sql, [customerID]);

    results.forEach((item) => {
        item.order_date = item.order_date.toLocaleDateString('fr-CA');
        item.desired_date = item.desired_date.toLocaleDateString('fr-CA');
    });
  
    return results
}

export async function getOrdersReadyToday(currentDate) {
    const sql = `
        SELECT orderID, order_date, customerID,
        concat(first_name, ' ', last_name) as 'Customer', email, phone,
        \`type\`, flavor, final_price, cake_details, statusID, \`description\`,
        desired_date FROM Teqcentric.order_view
        where statusID = 8
        and desired_date = ?
    `;
    const [results] = await db.query(sql, [currentDate]);

    results.forEach((item) => {
        item.order_date = item.order_date.toLocaleDateString('fr-CA');
        item.desired_date = item.desired_date.toLocaleDateString('fr-CA');
    });
  
    return results
}

export async function getOrdersNewToday(currentDate) {
    const sql = `
        SELECT orderID, order_date, customerID,
        concat(first_name, ' ', last_name) as 'Customer', email, phone,
        \`type\`, flavor, final_price, cake_details, statusID, \`description\`,
        desired_date FROM Teqcentric.order_view
        where statusID = 3
        and date_format(order_date, "%Y-%m-%d") = ?
    `;

    const [results] = await db.query(sql, [currentDate]);

    results.forEach((item) => {
        item.order_date = item.order_date.toLocaleDateString('fr-CA');
        item.desired_date = item.desired_date.toLocaleDateString('fr-CA');
    });
  
    return results
}

export async function getOrdersThisWeek() {
    const sql = `
        select *, concat(first_name, ' ', last_name) as 'Customer' from order_view
        where YEARWEEK(order_date, 1)=YEARWEEK(NOW(), 1);
    `;
    const [results] = await db.query(sql);

    results.forEach((item) => {
        item.order_date = item.order_date.toLocaleDateString('fr-CA');
        item.desired_date = item.desired_date.toLocaleDateString('fr-CA');
    });
  
    return results
}

// Get Order Status Descriptions from status table
export async function getPaymentTypes() {
    const sql = "select * from Payment_Type";
    const [results] = await db.query(sql);

    return results
}