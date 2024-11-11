<script>
    window.onload = function () {
        function showSection(sectionId) {
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
        }

        // Attaching to buttons if defined after the load
        document.querySelectorAll("nav button").forEach((btn, idx) => {
            btn.onclick = function () {
                const sectionIds = ["fantasy-teams", "top-players", "all-time-best-players", "all-teams"];
                showSection(sectionIds[idx]);
            };
        });
    };
</script>
