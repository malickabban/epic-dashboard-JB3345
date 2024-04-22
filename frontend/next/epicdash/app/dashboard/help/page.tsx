"use client"



const Help = () => {
  return (
    <div>
        <div className="bg-[var(--bgSoft)]">
            <h4 className="px-5 pt-5 pb-2 mt-2 text-[var(--text)]">Getting Started</h4>
            <ol className="px-5 pb-5 mb-5 text-[var(--text)]">
                <li>1. Search for patients in the leftmost search bar.</li>
                <li>2. Select patient from dropdown to add to patient list</li>
                <li>3. Select patient from patient list to populate dashboard with information.</li>
            </ol>
        </div>
        <div className="bg-[var(--bgSoft)]">
            <h4 className="px-5 pt-5 pb-2 mt-2 text-[var(--text)]">Additional Tips</h4>
            <ul className="px-5 pb-5 mb-5 text-[var(--text)]">
                <li>Search for notes in the Diagnostic Notes search bar.</li>
                <li>Add and copy notes to your clipboard</li>
                <li>Click on Scores to get detailed information about each score.</li>
                <li>Search for different scores and add and delete as needed.</li>
            </ul>
        </div>
    </div>
  );
};

export default Help;