export default function Reviews() {
  const reviews = [
    {
      text: "The Smoky Jollof reminds me exactly of Lagos parties. Delivery was fast and the food arrived piping hot. Highly recommended!",
      author: "Chidi Opara",
      location: "Lekki, Lagos",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXweX0hcQGNhqXi1wsU9-hrBtWcu6fKMeB8u96_pEG5RBo5I7rMtJlTBhcZgOux9y1EVLE-vQBtrIp3kbnba0oaOPmSL9oecRRd3ttjmepan6DSHNPzqjTSsyxMLi_De80woQnPfhXoWcH6-wxBZ0kivmfTXq_Y9RO7Jmm1gR5zuQ1zFF0w2Zl5bHbkZHtqNGFTFk1W8ncS7MHwv5imuOZGOkepzTF4hq3TYWS6k1ni0bV9OlRqxFCMhrqU6FZy7KXrNlDhdYcPfc"
    },
    {
      text: "Finally a place where I can get real Egusi soup with that home-cooked taste. KQ Foods is my new favorite for lunch.",
      author: "Fatima Bello",
      location: "Abuja, FCT",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbiGXcv1UlaOjhMd5tVyVZQmiVin4HNBzHWrRrQnskwfEoLhQ9Q_rRSn4_35sxW2CXw_zK2DNUWWyMul0s2jqwRw0wb8CUW5Lg-KsdvYhFEyGPKGMe1XnICEmUxJu2oIbHrjVzcK4mVlQc9QdLAea1NKDrKpvI8iHfN-yPwc0SQjoDx-DWst8WxRSuxT25UzaEff7Bax2j-IBYmOnTmsMl5fYoh8OF7pUQWPHXqjroFqNaus1kJHhS4iuzlJKp8rWCXpgcEKkd08Q"
    },
    {
      text: "The Puff Puff was so fresh and sweet. It’s hard to find authentic street snacks that are this hygienic and well-packaged.",
      author: "Tunde Williams",
      location: "Port Harcourt",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx0wopF2FvYpjlPnT2PV4bfIi9kyJyIOILKY2BPwozZmJmCbCp8udjCfqbScNGSyv1A_4lv_34PUyQ0I9v7D5H_WlaidIgeuUTBUqhyE8hT9TT6sd7ZfBL1VHVtz5f2P9Ei0EPi7FoCXSySpTSNP0HCIi8-ID5_U7zSQKNmKoVBCTaVQiWQYkw57tsIMZ92eF1_iBBPQjzHr80wITh2r4tBVPCQtPVGpCDGCSWeYZEyYH2VBYs51RvVfJb6_-fBWzzs9JkRQ0izo0"
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <h2 className="text-3xl font-headline font-bold text-center mb-16">What Our Community Says</h2>
      <div className="flex flex-nowrap gap-6 overflow-x-auto pb-8 scrollbar-hide">
        {reviews.map((review, idx) => (
          <div key={idx} className="min-w-[300px] md:min-w-[400px] bg-surface-container-low p-8 rounded-2xl relative">
            <span className="material-symbols-outlined text-5xl text-primary/10 absolute top-4 right-4">format_quote</span>
            <p className="italic text-on-surface-variant leading-relaxed mb-6">"{review.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-300 overflow-hidden">
                <img alt={review.author} src={review.image}/>
              </div>
              <div>
                <h5 className="font-bold text-sm">{review.author}</h5>
                <p className="text-xs text-outline italic">{review.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
