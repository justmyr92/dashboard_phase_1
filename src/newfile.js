const ids = [
    "10957759",
    "10957759",
    "10948898",
    "10948898",
    "10364899",
    "10988053",
    "10802503",
    "10936311",
    "10894308",
    "10202621",
    "10093128",
    "10228379",
    "10037707",
    "10037707",
];

// Function to remove duplicates while preserving order
function removeDuplicates(array) {
    const uniqueArray = [];
    const set = new Set();

    for (const item of array) {
        if (!set.has(item)) {
            set.add(item);
            uniqueArray.push(item);
        }
    }

    return uniqueArray;
}

const uniqueIds = removeDuplicates(ids);

// Function to update instrument number for a given instrument ID
const updateInstrumentNumber = async (instrument_id, instrument_number) => {
    try {
        const response = await fetch(
            "http://localhost:5000/api/updateInstrumentNum",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    instrument_id: instrument_id,
                    instrument_number: instrument_number,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Instrument ${instrument_id} updated successfully:`, data);
    } catch (error) {
        console.error(`Error updating instrument ${instrument_id}:`, error);
    }
};

// Loop through the ids and update the instrument numbers sequentially
uniqueIds.forEach(async (id, index) => {
    let instrument_number = index + 1; // Calculate instrument number (1-based index)
    await updateInstrumentNumber(id, instrument_number);
});
