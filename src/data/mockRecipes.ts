export interface Ingredient {
    id: string;
    name: string;
    amount: string;
}

export interface InstructionStep {
    timeSeconds: number;
    time?: string;
    title: string;
    text: string;
    tip?: string;
}

export interface Recipe {
    id: string; 
    title: string;
    match: number;
    healthMatch: string;
    time: string;
    calories: string;
    protein: string;
    tags: string[];
    dietary: string;
    image: string;
    description: string;
    ingredients: Ingredient[];
    instructions: InstructionStep[];
    author: string;
    rating: number;
    reviews: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced" | "Easy" | "Medium" | "Hard";
    chefTip?: string;
}

export const mockRecipes: Recipe[] = [
    {
        id: "1",
        title: "Zesty Lemon Chicken Salad",
        match: 98,
        healthMatch: "94%",
        time: "15 min",
        calories: "350 kcal",
        protein: "32g",
        tags: ["KETO", "HIGH PROTEIN"],
        dietary: "Low Carb, High Protein",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600&h=500",
        description: "A fresh and zesty salad packed with lean protein and vibrant flavors, perfect for a quick lunch.",
        ingredients: [
            { id: "i1", name: "Chicken Breast", amount: "200g" },
            { id: "i2", name: "Mixed Greens", amount: "2 cups" },
            { id: "i3", name: "Lemon", amount: "1 unit" },
            { id: "i4", name: "Cherry Tomatoes", amount: "1 cup" },
            { id: "i5", name: "Olive Oil", amount: "2 tbsp" }
        ],
        instructions: [
            { timeSeconds: 300, time: "5 MIN", title: "Cook Chicken", text: "Grill or pan-fry the seasoned chicken breast until fully cooked.", tip: "Don't overcook, use a meat thermometer." },
            { timeSeconds: 300, time: "5 MIN", title: "Prep Veggies", text: "Wash and prepare the mixed greens and cherry tomatoes." },
            { timeSeconds: 120, time: "2 MIN", title: "Make Dressing", text: "Whisk olive oil and fresh lemon juice to make the dressing." },
            { timeSeconds: 180, time: "3 MIN", title: "Mix & Serve", text: "Slice the cooked chicken, toss with greens and dressing, and serve." }
        ],
        author: "Chef Alex",
        rating: 4.8,
        reviews: 124,
        difficulty: "Beginner",
        chefTip: "Marinate the chicken in lemon juice for 10 minutes before cooking for extra flavor."
    },
    {
        id: "2",
        title: "Avocado Toast with Egg",
        match: 95,
        healthMatch: "88%",
        time: "10 min",
        calories: "420 kcal",
        protein: "18g",
        tags: ["BREAKFAST", "VEGETARIAN"],
        dietary: "Vegetarian",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600&h=500",
        description: "A classic, nutritious breakfast rich in healthy fats and protein to start your day right.",
        ingredients: [
            { id: "i1", name: "Sourdough Bread", amount: "2 slices" },
            { id: "i2", name: "Ripe Avocado", amount: "1 unit" },
            { id: "i3", name: "Eggs", amount: "2 units" },
            { id: "i4", name: "Red Pepper Flakes", amount: "1 tsp" },
            { id: "i5", name: "Salt and Pepper", amount: "to taste" }
        ],
        instructions: [
            { timeSeconds: 180, time: "3 MIN", title: "Toast Bread", text: "Toast the sourdough bread slices until golden brown." },
            { timeSeconds: 180, time: "3 MIN", title: "Mash Avocado", text: "Mash the avocado with salt and pepper." },
            { timeSeconds: 240, time: "4 MIN", title: "Cook Eggs", text: "Cook eggs to your preference (poached, fried, or scrambled)." },
            { timeSeconds: 60, time: "1 MIN", title: "Assemble", text: "Spread avocado on toast, top with eggs, and sprinkle red pepper flakes." }
        ],
        author: "Chef Sarah",
        rating: 4.9,
        reviews: 312,
        difficulty: "Beginner",
        chefTip: "A squeeze of fresh lime juice in the mashed avocado prevents browning and adds a bright zesty kick."
    },
    {
        id: "3",
        title: "Spicy Quinoa Bowl",
        match: 92,
        healthMatch: "92%",
        time: "20 min",
        calories: "450 kcal",
        protein: "14g",
        tags: ["VEGAN", "GLUTEN-FREE"],
        dietary: "Vegan, Gluten-Free",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600&h=500",
        description: "A hearty and spicy bowl loaded with plant-based protein, fiber, and delicious veggies.",
        ingredients: [
            { id: "i1", name: "Quinoa", amount: "1 cup (cooked)" },
            { id: "i2", name: "Black Beans", amount: "1/2 cup" },
            { id: "i3", name: "Corn", amount: "1/4 cup" },
            { id: "i4", name: "Jalapeño", amount: "1 unit" },
            { id: "i5", name: "Avocado", amount: "1/2 unit" },
            { id: "i6", name: "Salsa", amount: "2 tbsp" }
        ],
        instructions: [
            { timeSeconds: 900, time: "15 MIN", title: "Cook Quinoa", text: "Cook the quinoa according to package instructions if not pre-cooked." },
            { timeSeconds: 120, time: "2 MIN", title: "Prep Veggies", text: "Rinse the black beans and corn." },
            { timeSeconds: 120, time: "2 MIN", title: "Slice", text: "Slice the jalapeño and avocado." },
            { timeSeconds: 60, time: "1 MIN", title: "Assemble", text: "Assemble the bowl starting with quinoa, then add toppings and salsa." }
        ],
        author: "Earth Bowls",
        rating: 4.7,
        reviews: 89,
        difficulty: "Intermediate",
        chefTip: "Rinse quinoa thoroughly before cooking to remove its natural bitter coating."
    },
    {
        id: "4",
        title: "Berry Acai Smoothie",
        match: 88,
        healthMatch: "96%",
        time: "5 min",
        calories: "280 kcal",
        protein: "5g",
        tags: ["VEGAN", "BREAKFAST"],
        dietary: "Vegan",
        image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=600&h=500",
        description: "A refreshing and antioxidant-rich smoothie perfect for a quick snack or light breakfast.",
        ingredients: [
            { id: "i1", name: "Acai Puree", amount: "1 packet" },
            { id: "i2", name: "Mixed Berries (Frozen)", amount: "1 cup" },
            { id: "i3", name: "Banana", amount: "1/2 unit" },
            { id: "i4", name: "Almond Milk", amount: "1/2 cup" },
            { id: "i5", name: "Chia Seeds", amount: "1 tbsp" }
        ],
        instructions: [
            { timeSeconds: 60, time: "1 MIN", title: "Prep", text: "Gather all ingredients and add them to the blender." },
            { timeSeconds: 120, time: "2 MIN", title: "Blend", text: "Blend on high until smooth and creamy." },
            { timeSeconds: 60, time: "1 MIN", title: "Check consistency", text: "Check consistency. Add more almond milk if it's too thick." },
            { timeSeconds: 60, time: "1 MIN", title: "Serve", text: "Pour into a glass, top with extra chia seeds, and enjoy." }
        ],
        author: "Smoothie Masters",
        rating: 4.9,
        reviews: 215,
        difficulty: "Beginner",
        chefTip: "Use frozen bananas instead of ice cubes to keep the smoothie creamy and thick."
    }
];
